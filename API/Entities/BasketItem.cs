using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
	[Table("BasketItems")]
	public class BasketItem
	{
		public int Id { get; set; }
		public int Quantity { get; set; }

		//EF Navigation Properties
		public int BasketId { get; private set; }
		public Basket Basket { get; set; }
		public int ProductId { get; set; }
		public Product Product { get; set; }
	}
}
