using Jugueteria.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jugueteria.API
{
    public class AplicationDbContext : DbContext
    {
        public DbSet<Juguete> Juguete { get; set; }

        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Juguete>().Property(p => p.Precio).HasColumnType("money");
        }
    }
}
