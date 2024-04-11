using System.Text;
using API.Data;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
	var jwtSecurityScheme = new OpenApiSecurityScheme
	{
		BearerFormat = "JWT",
		Name = "Authorization",
		In = ParameterLocation.Header,
		Type = SecuritySchemeType.ApiKey,
		Scheme = JwtBearerDefaults.AuthenticationScheme,
		Description = "Put Bearer + your token in the box below",
		Reference = new OpenApiReference
		{
			Id = JwtBearerDefaults.AuthenticationScheme,
			Type = ReferenceType.SecurityScheme
		}
	};

	c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

	c.AddSecurityRequirement(
		new OpenApiSecurityRequirement { { jwtSecurityScheme, Array.Empty<string>() } }
	);
});

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

builder
	.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(opt =>
	{
		opt.TokenValidationParameters = new TokenValidationParameters
		{
			ValidateIssuer = false,
			ValidateAudience = false,
			ValidateLifetime = true,
			ValidateIssuerSigningKey = true,
			IssuerSigningKey = new SymmetricSecurityKey(
				Encoding.UTF8.GetBytes(builder.Configuration["JWTSettings:TokenKey"])
			)
		};
	});
builder.Services.AddAuthorization();
builder.Services.AddScoped<TokenService>();

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI(c =>
	{
		c.ConfigObject.AdditionalItems.Add("persistAuthorization", "true");
	});
}

app.UseCors(opt =>
{
	opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});

app.UseAuthentication();
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
