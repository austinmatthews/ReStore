using API.Data;
using API.Entities;
using API.Extensions;
//Needed for API functions
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	//Dependency injection - pass in objects that the current object needs instead of creating the objects internally
	public class ProductsController(StoreContext context) : BaseApiController
	{
		//Set passed in variables as a private copy
		//Underscore used to mark a private field
		private readonly StoreContext _context = context;

		[HttpGet]
		//DB calls should be async
		//Task is used when we are returning async
		public async Task<ActionResult<List<Product>>> GetProducts(
			string orderBy,
			string searchTerm,
			string brands,
			string types
		)
		{
			var query = _context
				.Products.Sort(orderBy)
				.Search(searchTerm)
				.Filter(brands, types)
				.AsQueryable();

			return await query.ToListAsync();
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Product>> GetProduct(int id)
		{
			var product = await _context.Products.FindAsync(id);

			return product != null ? product : NotFound();
		}
	}
}
