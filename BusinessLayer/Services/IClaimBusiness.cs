using BusinessObjectLayer;
using System;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public interface IClaimBusiness
    {
        public APIResponse GetCustomerByCif(int cif);
        public APIResponse GetPreClaimDetailByCif(int cif);
    }
}
