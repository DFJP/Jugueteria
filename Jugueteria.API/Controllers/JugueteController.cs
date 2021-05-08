using Jugueteria.API.Models;
using Jugueteria.API.RepositoriesInterface;
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
        private readonly IJugueteRepository _jugueteRepository;
        public JugueteController(IJugueteRepository jugueteRepository)
        {
            _jugueteRepository = jugueteRepository;
        }

        // GET: api/<JugueteController>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var listaJuguetes =  _jugueteRepository.GetAll();
                return Ok(listaJuguetes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
        // POST api/<JugueteController>
        [HttpPost]
        public  IActionResult Post([FromBody] Juguete juguete)
        {
            try
            {
                var j =  _jugueteRepository.Insert(juguete);
                return Ok(j);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<JugueteController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Juguete juguete)
        {
            try
            {
                if(id != juguete.id)
                {
                    return NotFound();
                }

                _jugueteRepository.Update(juguete);

                return Ok(new { message = $"El Juguete {juguete.Nombre} fue actualizado correctamente"});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<JugueteController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _jugueteRepository.Delete(id);
                return Ok(new { message = "El Juguete se elimino correctamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
