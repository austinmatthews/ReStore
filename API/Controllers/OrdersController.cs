using API.Data;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	[Authorize]
	public class OrdersController(StoreContext context) : BaseApiController
	{
		private readonly StoreContext _context = context;

		[HttpGet]
		public async Task<ActionResult<List<Order>>> GetOrders()
		{
			return await _context
				.Orders.Include(o => o.OrderItems)
				.Where(x => x.BuyerId == User.Identity.Name)
				.ToListAsync();
		}

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
      return await _context
        .Orders.Include(o => o.OrderItems)
        .Where(x => x.BuyerId == User.Identity.Name)
        .FirstOrDefaultAsync(x => x.Id == id);
    }
	}
}
