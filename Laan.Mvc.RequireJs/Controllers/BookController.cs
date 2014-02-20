using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

using Laan.Mvc.RequireJs.Models;

namespace Laan.Mvc.RequireJs.Controllers
{
    public class BookController : Controller
    {
        static private Dictionary<int, Book> _books;

        static BookController()
        {
            _books = new [] 
            { 
                new Book { Id = 1, Author = "Ben", Title = "Bork On Your Fork", PublishDate = new DateTime(2000, 10, 1) }, 
                new Book { Id = 2, Author = "Ben", Title = "Get More Bork On Your Fork", PublishDate = new DateTime(2002, 12, 1) }, 
                new Book { Id = 3, Author = "Mei-Lin", Title = "Bad Book Titles", PublishDate = new DateTime(2002, 12, 2) }
            }
            .ToDictionary(b => b.Id, b => b);
        }

        public ActionResult Index()
        {
            return View(_books.Values.ToList());
        }

        public ActionResult Edit(int id)
        {
            return View(_books[id]);
        }

        [HttpPost]
        public ActionResult Submit(Book book)
        {
            if(Request.Form.GetValues("save") != null)
                _books[book.Id] = book;

            return RedirectToRoute(new { controller = "book", action = "index" });
        }
    }
}
