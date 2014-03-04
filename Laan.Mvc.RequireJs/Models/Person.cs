using System;
using System.Collections.Generic;
using System.Linq;

using Newtonsoft.Json;

namespace Laan.Mvc.RequireJs.Models
{
    public class Person
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [JsonConverter(typeof(ShortDateConverter))]
        public DateTime BirthDate { get; set; }
    }
}