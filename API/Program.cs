using API.Data;
using API.Entities;
using API.Middleware;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Adding the DB context and grabbing DefaultConnection string which is set in appSettings
builder.Services.AddDbContext<StoreContext>(opt =>
{
	opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();
builder
	.Services.AddIdentityCore<User>(opt =>
	{
		opt.User.RequireUniqueEmail = true;
	})
	.AddRoles<IdentityRole>()
	.AddEntityFrameworkStores<StoreContext>();

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseCors(opt =>
{
	opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});

app.UseAuthorization();

app.MapControllers();

//Grabs the services and adds it to scope
var scope = app.Services.CreateScope();

//Grabs db context and logger from the scope
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

//Try catch because it might fail
try
{
	//Applies pending migrations and creates db if it does not exist yet
	await context.Database.MigrateAsync();
	//Static call to Initialize to pass in context and add data to db
	await DbInitializer.InitializeAsync(context, userManager);
}
catch (Exception ex)
{
	logger.LogError(ex, "A problem occured during migration");
}

app.Run();
