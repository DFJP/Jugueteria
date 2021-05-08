using Jugueteria.API.Models;
using System.Collections.Generic;

namespace Jugueteria.API.RepositoriesInterface
{
    public interface IJugueteRepository
    {
        IEnumerable<Juguete> GetAll();
        Juguete Insert(Juguete juguete);
        Juguete Update(Juguete juguete);
        void Delete(int id);
    }
}
