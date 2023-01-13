using System.Linq;
using System.Collections.Generic;

namespace API.Entities
{
	public class Basket
	{
		public int Id { get; set; }
		public string BuyerId { get; set; }
		public List<BasketItem> Items { get; set; } = new();

		public void AddItem(Product product, int qantity)
		{
			if (Items.All(item => item.ProductId != product.Id))
			{
				Items.Add(new BasketItem
				{
					Quantity = qantity,
					Product = product
				});
			}
			else
			{
				var item = Items.FirstOrDefault(item => item.ProductId == product.Id);
				if (item != null) item.Quantity += qantity;
			}
		}

		public void RemoveItem(int productId, int qantity)
		{
			var item = Items.FirstOrDefault(item => item.ProductId == productId);
			if (item == null) return;
			item.Quantity -= qantity;
			if (item.Quantity <= 0) Items.Remove(item);
		}
	}
}