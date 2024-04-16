using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	public class BasketController(StoreContext context) : BaseApiController
	{
		private readonly StoreContext _context = context;

		#region Endpoints
		[HttpGet(Name = "GetBasket")]
		public async Task<ActionResult<BasketDto>> GetBasket()
		{
			var basket = await RetrieveBasket(GetBuyerId());

			if (basket == null)
				return NotFound();

			return basket.MapBasketToDto();
		}

		[HttpPost]
		public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
		{
			//get basket || create basket and cookie for user
			var basket = await RetrieveBasket(GetBuyerId()) ?? CreateBasket();

			//get product
			var product = await _context.Products.FindAsync(productId);
			if (product == null)
				return BadRequest(new ProblemDetails { Title = "Product Not Found" });

			//add item
			basket.AddItem(product, quantity);

			//save changes
			var result = await _context.SaveChangesAsync() > 0;

			if (result)
				return CreatedAtRoute("GetBasket", basket.MapBasketToDto());

			return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
		}

		[HttpDelete]
		public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
		{
			//get basket || create basket and cookie for user
			var basket = await RetrieveBasket(GetBuyerId());

			if (basket == null)
				return NotFound();

			basket.RemoveItem(productId, quantity);

			var result = await _context.SaveChangesAsync() > 0;

			if (result)
				return Ok();

			return BadRequest(new ProblemDetails { Title = "Problem deleting basket item" });
		}
		#endregion Endpoints
		#region Helpers
		private async Task<Basket> RetrieveBasket(string buyerId)
		{
			if (string.IsNullOrEmpty(buyerId))
			{
				Response.Cookies.Delete("buyerId");
				return null;
			}
			return await _context
				.Baskets.Include(b => b.Items)
				.ThenInclude(bi => bi.Product)
				.FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
		}

		private string GetBuyerId()
		{
			return User.Identity?.Name ?? Request.Cookies["buyerId"];
		}

		private Basket CreateBasket()
		{
			var buyerId = User.Identity?.Name;
			if (string.IsNullOrEmpty(buyerId))
			{
				buyerId = Guid.NewGuid().ToString();

				var cookieOptions = new CookieOptions
				{
					IsEssential = true,
					Expires = DateTime.Now.AddDays(30)
				};

				Response.Cookies.Append("buyerId", buyerId, cookieOptions);
			}
			var basket = new Basket { BuyerId = buyerId };
			_context.Baskets.Add(basket);

			return basket;
		}
		#endregion Helpers
	}
}
