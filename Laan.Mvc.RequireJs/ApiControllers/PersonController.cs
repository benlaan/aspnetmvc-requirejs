using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

using Laan.Mvc.RequireJs.Models;

namespace Laan.Mvc.RequireJs.ApiControllers
{
    public class PersonController : ApiController
    {
        static private Dictionary<int, Person> _people;

        static PersonController()
        {
            _people = new[] 
            { 
                new Person { Id = 1, FirstName = "Ben", LastName = "Laan", BirthDate = new DateTime(1975, 10, 1) },
                new Person { Id = 2, FirstName = "Lin", LastName = "Laan", BirthDate = new DateTime(1980, 12, 1) },
            }
            .ToDictionary(b => b.Id, b => b);
        }

        public PersonController()
        {

        }

        // GET api/<controller>
        public IEnumerable<Person> Get()
        {
            return _people.Values;
        }

        // GET api/<controller>/5
        public Person Get(int id)
        {
            return _people[id];
        }

        // POST api/<controller>
        public void Post([FromBody]Person person)
        {
            _people[person.Id] = person;
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]Person person)
        {
            _people[id] = person;
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            _people.Remove(id);
        }
    }
}