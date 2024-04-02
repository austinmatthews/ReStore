using System.Text.Json;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
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
			[FromQuery] ProductParams productParams
		)
		{
			var query = _context
				.Products.Sort(productParams.OrderBy)
				.Search(productParams.SearchTerm)
				.Filter(productParams.Brands, productParams.Types)
				.AsQueryable();

			var products = await PagedList<Product>.ToPagedList(
				query,
				productParams.PageNumber,
				productParams.PageSize
			);

			Response.AddPaginationHeader(products.MetaData);

			return products;
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Product>> GetProduct(int id)
		{
			var product = await _context.Products.FindAsync(id);

			return product != null ? product : NotFound();
		}

		[HttpGet("filters")]
		public async Task<IActionResult> GetFilters()
		{
			var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
			var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

			return Ok(new { brands, types });
		}
	}
}
