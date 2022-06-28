using Lab9.Context;
using Lab9.Models;

namespace Lab9.Services
{
    public class LoginService
    {
        private ProductContext _context;

        public LoginService(ProductContext context)
        {
            _context = context;
        }

        public bool Login(string username, string password)
        {
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
            User user = _context.Users.FirstOrDefault(x => x.Username.Equals(username) && x.Password.Equals(password));
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
            if(user == null)
            {
                return false;
            }

            return true;
        }
    }
}
