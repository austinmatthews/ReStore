using System.ComponentModel.DataAnnotations;

namespace API.Entities.OrderAggregate
{
	public class Order
	{
		public int Id { get; set; }
		public string BuyerId { get; set; }

		[Required]
		public ShippingAddress ShippingAddress { get; set; }
		public DateTime OrderDate { get; set; } = DateTime.Now;
		public List<OrderItem> OrderItmes { get; set; }
		public long Subtotal { get; set; }
		public long DeliveryFee { get; set; }
		public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;

		public long GetTotal() => Subtotal + DeliveryFee;
	}
}
