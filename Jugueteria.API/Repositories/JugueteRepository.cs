using Jugueteria.API.Models;
using Jugueteria.API.RepositoriesInterface;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Jugueteria.API.Repositories
{
    public class JugueteRepository : IJugueteRepository
    {
        private readonly AplicationDbContext _context;

        public JugueteRepository(AplicationDbContext context)
        {
            _context = context;
        }

        public void Delete(int id)
        {
            var juguete = _context.Juguete.Find(id);

            if(juguete == null)
            {
                throw new KeyNotFoundException("El juguete no existe"); 
            }

            _context.Juguete.Remove(juguete);
            _context.SaveChanges();
        }

        public IEnumerable<Juguete> GetAll()
        {
            return _context.Juguete.ToList();
        }

        public Juguete Insert(Juguete juguete)
        {
            _context.Juguete.Add(juguete);
            _context.SaveChanges();
            return juguete;
        }

        public Juguete Update(Juguete juguete)
        {
            _context.Entry(juguete).State = EntityState.Modified;
            _context.SaveChanges();            
            return juguete;
        }
    }
}
