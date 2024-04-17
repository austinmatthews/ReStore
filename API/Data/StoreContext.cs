using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
	//DBContext gives us a connection to the db
	public class StoreContext(DbContextOptions options) : IdentityDbContext<User, Role, int>(options) //Have to extend the DbContext class / Changed to IdentityDbContext<User> after adding identity
	{
		//Each DBSet represents a table in the DB
		public DbSet<Product> Products { get; set; }
		public DbSet<Basket> Baskets { get; set; }
		public DbSet<Order> Orders { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			builder
				.Entity<User>()
				.HasOne(a => a.Address)
				.WithOne()
				.HasForeignKey<UserAddress>(a => a.Id)
				.OnDelete(DeleteBehavior.Cascade);

			builder
				.Entity<Role>()
				.HasData(
					new Role
					{
						Id = 1,
						Name = "Member",
						NormalizedName = "MEMBER"
					},
					new Role
					{
						Id = 2,
						Name = "Admin",
						NormalizedName = "ADMIN"
					}
				);
		}
	}
}
