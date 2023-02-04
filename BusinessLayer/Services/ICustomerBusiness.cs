using BusinessObjectLayer;
using System;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public interface ICustomerBusiness
    {
        public APIResponse GetById(int customerId);
        public APIResponse GetByCif(int cif);
    }
}
