using Jugueteria.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Jugueteria.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JugueteController : ControllerBase
    {
        private readonly AplicationDbContext _context;
        public JugueteController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<JugueteController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listaJuguetes = await _context.Juguete.ToListAsync();
                return Ok(listaJuguetes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
        // POST api/<JugueteController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Juguete juguete)
        {
            try
            {
                _context.Add(juguete);
                await _context.SaveChangesAsync();
                return Ok(juguete);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<JugueteController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Juguete juguete)
        {
            try
            {
                if(id != juguete.id)
                {
                    return NotFound();
                }

                _context.Update(juguete);
                await _context.SaveChangesAsync();
                return Ok(new { message = "El Juguete fue actualizado correctamente"});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<JugueteController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var juguete = await _context.Juguete.FindAsync(id);

                if(juguete == null)
                {
                    return NotFound();
                }

                _context.Remove(juguete);
                await _context.SaveChangesAsync();
                return Ok(new { message = "El Juguete se elimino correctamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
