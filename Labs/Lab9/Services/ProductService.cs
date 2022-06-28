using Lab9.Context;
using Lab9.Models;
using Lab9.ResponseDto;

namespace Lab9.Services
{
    public class ProductService
    {
        private ProductContext _context;

        public ProductService(ProductContext context)
        {
            _context = context;
        }

        public List<Product> GetProducts()
        {
            return _context.Products.ToList();
        }

        public List<Product> GetProductsFiltered(string category)
        {
            return _context.Products.Where(p => p.Name.Contains(category)).ToList();
        }

        public ProductResponse GetProductsPaginated(string cat, int page)
        {
            var pageResults = 4f;
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            var pageCount = Math.Ceiling(_context.Products.Where(p => p.Name.StartsWith(cat)).Count() / pageResults);
#pragma warning restore CS8602 // Dereference of a possibly null reference.

#pragma warning disable CS8602 // Dereference of a possibly null reference.
            var products = _context.Products
                .Where(p => p.Name.StartsWith(cat))
                .Skip((page - 1) * (int)pageResults)
                .Take((int)pageResults)
                .ToList();
#pragma warning restore CS8602 // Dereference of a possibly null reference.

            var response = new ProductResponse
            {
                Products = products,
                CurrentPage = page,
                Pages = (int)pageCount
            };

            return response;
        }
    }
}
