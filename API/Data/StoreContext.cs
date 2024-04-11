using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Data
{
	//DBContext gives us a connection to the db
	public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options) //Have to extend the DbContext class / Changed to IdentityDbContext<User> after adding identity
	{
		//Each DBSet represents a table in the DB
		public DbSet<Product> Products { get; set; }
		public DbSet<Basket> Baskets { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			builder
				.Entity<IdentityRole>()
				.HasData(
					new IdentityRole { Name = "Member", NormalizedName = "MEMBER" },
					new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
				);
		}
	}
}
