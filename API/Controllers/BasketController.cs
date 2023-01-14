using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	public class BasketController : BaseApiController
	{
		private readonly StoreContext _context;
		public BasketController(StoreContext context)
		{
			_context = context;
		}

		[HttpGet(Name = "GetBasket")]
		public async Task<ActionResult<BasketDto>> GetBasket()
		{
			var basket = await RetrieveBusket();
			if (basket == null) return NotFound();
			return MapBasketToDto(basket);
		}


		[HttpPost]
		public async Task<ActionResult<BasketDto>> AddItemToBusket(int productId, int quantity)
		{
			var basket = await RetrieveBusket();

			if (basket == null) basket = CreateBasket();
			var product = await _context.Products.FindAsync(productId);

			if (product == null) return BadRequest(new ProblemDetails { Title = "Product not found" });
			basket.AddItem(product, quantity);
			var result = await _context.SaveChangesAsync() > 0;

			if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

			return BadRequest(new ProblemDetails { Title = "Problem while adding item to basket" });
		}


		[HttpDelete]
		public async Task<ActionResult> RemoveItemFromBasket(int productId, int quantity)
		{
			var basket = await RetrieveBusket();
			if (basket == null) return NotFound();
			basket.RemoveItem(productId, quantity);

			var result = await _context.SaveChangesAsync() > 0;
			if (result) return StatusCode(202);
			return BadRequest(new ProblemDetails { Title = "Problem while removing item from basket" });
		}

		private async Task<Basket> RetrieveBusket()
		{
			return await _context.Baskets
						.Include(b => b.Items)
						.ThenInclude(i => i.Product)
						.FirstOrDefaultAsync(b => b.BuyerId == Request.Cookies["buyerId"]);
		}

		private Basket CreateBasket()
		{
			var buyerId = Guid.NewGuid().ToString();
			var cookieOptions = new CookieOptions
			{
				IsEssential = true,
				Expires = DateTime.Now.AddDays(30)
			};
			Response.Cookies.Append("buyerId", buyerId, cookieOptions);
			var basket = new Basket { BuyerId = buyerId };
			_context.Baskets.Add(basket);
			return basket;
		}
		private BasketDto MapBasketToDto(Basket basket)
		{
			return new BasketDto
			{
				Id = basket.Id,
				BuyerId = basket.BuyerId,
				Items = basket.Items.Select(i => new BasketItemDto
				{
					ProductId = i.ProductId,
					Name = i.Product.Name,
					Price = i.Product.Price,
					Quantity = i.Quantity,
					PictureUrl = i.Product.PictureUrl,
					Type = i.Product.Type,
					Brand = i.Product.Brand
				}).ToList()
			};
		}
	}

}