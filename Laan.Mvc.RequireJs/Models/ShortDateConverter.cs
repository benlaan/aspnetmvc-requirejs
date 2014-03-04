using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

using Newtonsoft.Json;

namespace Laan.Mvc.RequireJs.Models
{
    public class ShortDateConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(DateTime);
        }

        public override object ReadJson(Newtonsoft.Json.JsonReader reader,
             Type objectType,
             object existingValue,
             Newtonsoft.Json.JsonSerializer serializer)
        {
            return DateTime.ParseExact((string)reader.Value, "yyyy-MM-dd", CultureInfo.InvariantCulture);
        }

        public override void WriteJson(Newtonsoft.Json.JsonWriter writer,
             object value,
             Newtonsoft.Json.JsonSerializer serializer)
        {
            DateTime d = (DateTime)value;
            writer.WriteValue(d.ToString("yyyy-MM-dd"));
        }
    }
}

