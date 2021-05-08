using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Jugueteria.API.Models
{
    public class Juguete
    {
        public int id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Nombre { get; set; }

        [MaxLength(100)]
        public string Descripcion { get; set; }

        [Range(0, 100)]
        public int? RestriccionEdad { get; set; }

        [Required]
        [MaxLength(50)]
        public string Compania { get; set; }

        [Range(1, 1000)]
        public decimal Precio { get; set; }
    }
}
