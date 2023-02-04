using BusinessObjectLayer;
using System;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public interface IInsuranceCompanyBusiness
    {
        public APIResponse GetById(int insuranceCompanyId);

    }
}
