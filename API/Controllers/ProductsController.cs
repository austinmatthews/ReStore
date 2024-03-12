using API.Data;
using API.Entities;
//Needed for API functions
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	//Gives the class api abilities
	[ApiController]
	[Route("api/[controller]")]
	//Need to extend controllerBase
	//Dependency injection - pass in objects that the current object needs instead of creating the objects internally

	public class ProductsController(StoreContext context) : ControllerBase
	{
		//Set passed in variables as a private copy
    //Underscore used to mark a private field
		private readonly StoreContext _context = context;

    [HttpGet]
    //DB calls should be async
    //Task is used when we are returning async
		public async Task<List<Product>> GetProducts()
		{
			return await _context.Products.ToListAsync();
		}

		[HttpGet("{id}")]
		public async Task<Product> GetProduct(int id)
		{
			return await _context.Products.FindAsync(id);
		}
	}
}