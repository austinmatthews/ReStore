using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  //DBContext gives us a connection to the db
  public class StoreContext(DbContextOptions options) : DbContext(options) //Have to extend the DbContext class
  {
    //Each DBSet represents a table in the DB
    public DbSet<Product> Products { get; set; }
  }
}
