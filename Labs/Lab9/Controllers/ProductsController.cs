using Lab9.Models;
using Lab9.ResponseDto;
using Lab9.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Lab9.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private ProductService _service;

        public ProductsController(ProductService service)
        {
            _service = service;
        }

        // GET: api/<ProductsController>
        //[HttpGet("getProducts")]
        //[AllowAnonymous]
        //public List<Product> GetProducts()
        //{
        //    return _service.GetProducts();
        //}

        //[HttpGet("getProducts/{category}")]
        //[AllowAnonymous]
        //public List<Product> GetProductsFiltered(string category)
        //{
        //    return _service.GetProductsFiltered(category);
        //}

        [HttpGet("products")]
        [Authorize]
        public ProductResponse GetProductsPaginated(string category, int page)
        {
            return _service.GetProductsPaginated(category, page);
        }

    }
}
