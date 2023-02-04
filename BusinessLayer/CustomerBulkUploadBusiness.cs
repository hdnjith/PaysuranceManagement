using BusinessObjectLayer;
using DataAccessLayer.Data;
using Microsoft.EntityFrameworkCore;
using Syncfusion.XlsIO;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class CustomerBulkUploadBusiness : ICustomerBulkUploadBusiness
    {

        private readonly PaysuranceManagementContext _context;
        private readonly IAPIResponse _payIsuAPIResponse;
        private readonly ICustomerOnboardMethodBusiness _customerOnboardMethodBusiness;
        private readonly ICustomerBusiness _customerBusiness;


        public CustomerBulkUploadBusiness(PaysuranceManagementContext context, IAPIResponse payIsuAPIResponse,
            ICustomerOnboardMethodBusiness customerOnboardMethodBusiness, ICustomerBusiness customerBusiness)
        {
            _context = context;
            _payIsuAPIResponse = payIsuAPIResponse;
            _customerOnboardMethodBusiness = customerOnboardMethodBusiness;
            _customerBusiness = customerBusiness;
        }

        private bool ObjExists(string fileName)
        {
            return _context.CustomerBulkUpload.Any(e => e.FileName == fileName);
        }

        public async Task<APIResponse> UploadFile( FileModel FormFile)
        {
            int vSino = 0;
            try
            {


                if (!ObjExists(FormFile.FileName))
                {


                ///////////////////////////
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", FormFile.FileName);
                    List<CustomerBulkUpload> finalUploadList = new List<CustomerBulkUpload>();
                    //await using (Stream stream = new FileStream(path, FileMode.Create))
                    //{
                    using (Stream fileStream = FormFile.FormFile.OpenReadStream())
                {
                    //FormFile.FormFile.CopyTo(fileStream);
                    //Instantiate the spreadsheet creation engine
                    using (ExcelEngine excelEngine = new ExcelEngine())

                    {
                        //Initialize application
                        IApplication app = excelEngine.Excel;

                        //Set default application version as Xlsx
                        app.DefaultVersion = ExcelVersion.Xlsx;

                        //Open existing Excel workbook from the specified location
                        //   string inputFileName = textFile;

                        IWorkbook workbook = app.Workbooks.Open(fileStream, ExcelOpenType.Automatic);

                        //Access the first worksheet
                        IWorksheet worksheet = workbook.Worksheets[0];

                        //Access the used range of the Excel file
                        IRange usedRange = worksheet.UsedRange;
                        //int lastRow = usedRange.LastRow;
                        //  int lastColumn = usedRange.LastColumn;
                        int lastRow = 500;
                        int lastColumn = 20;
                            //Iterate the cells in the used range and print the cell values
                            //////////////////////<<<<<<<<<<<<<<<<<<
                            //for (int row1 = 1; row1 <= lastRow; row1++)
                            //{
                            //    for (int col1 = 1; col1 <= lastColumn; col1++)
                            //    {
                            //        Console.Write(worksheet[row1, col1].Value);
                            //        Console.Write("\t\t");
                            //    }
                            //    Console.WriteLine("\n");
                            //}
                            ////////////////<<<<<<<<<<<<<<<<<<<<<<<<
                            ///
                         

                        //Iterate the cells in the used range and print the display text
                        for (int row1 = 1; row1 <= lastRow; row1++)
                        {
                            CustomerBulkUpload customerBulkUpload = new CustomerBulkUpload();
                            customerBulkUpload.CreatedDate = DateTime.Now;
                            customerBulkUpload.FileName = FormFile.FileName;
                            customerBulkUpload.parentCustomerId = FormFile.CustomerId;
                            customerBulkUpload.IsActive = true;



                            for (int col1 = 1; col1 <= lastColumn; col1++)
                            {

                                string cellValText = worksheet[row1, col1].DisplayText.ToString();




                                if (row1 != 1)
                                {
                                    switch (col1)
                                    {
                                        case 1:
                                            customerBulkUpload.SiNo = Convert.ToInt32(cellValText);
                                                vSino = Convert.ToInt32(cellValText);
                                            break;
                                        case 2:
                                            customerBulkUpload.PolicyNo = cellValText;
                                            break;

                                        case 3:
                                            customerBulkUpload.NationalId = cellValText;
                                            break;
                                        case 4:
                                            customerBulkUpload.EpfNo = cellValText;
                                            break;
                                        case 5:
                                            customerBulkUpload.SingleFamilyIdentifier = cellValText;
                                            break;
                                        case 6:
                                            customerBulkUpload.InsuredName = cellValText;
                                            break;

                                        case 7:
                                            customerBulkUpload.Sex = cellValText;
                                            break;
                                        case 8:
                                            customerBulkUpload.Dob = FormatDate(cellValText);
                                            break;

                                        case 9:
                                            customerBulkUpload.Relation = cellValText;
                                            break;
                                        case 10:
                                            customerBulkUpload.InflCoverageType = cellValText;
                                            break;
                                        case 11:
                                            customerBulkUpload.SchemeNo = cellValText;
                                            break;
                                        case 12:
                                            customerBulkUpload.Coverage = Convert.ToDecimal(FormatDecimal(cellValText));
                                            break;

                                        case 13:
                                            customerBulkUpload.CriticalIllnessAmount = Convert.ToDecimal(FormatDecimal(cellValText));
                                            break;
                                        case 14:
                                            customerBulkUpload.OpdAmount = Convert.ToDecimal(FormatDecimal(cellValText));
                                            break;

                                        case 15:
                                            customerBulkUpload.Email = cellValText;
                                            break;
                                        case 16:
                                            customerBulkUpload.MobileNumber = cellValText;
                                            break;
                                        case 17:
                                            customerBulkUpload.PolicyStartDate = FormatDate(cellValText);
                                            break;
                                        case 18:
                                            customerBulkUpload.PolicyEndDate = FormatDate(cellValText);
                                            break;

                                        case 19:
                                            customerBulkUpload.EffectiveDate = FormatDate(cellValText);
                                            break;
                                        case 20:
                                            customerBulkUpload.SpecialRemarks = cellValText;
                                            break;
                                        default:
                                            // code block
                                            break;
                                    }


                                }







                            }
                            if (row1 != 1)
                            {
                                    //   await SaveCustomer(customerBulkUpload);

                                  

                                    finalUploadList.Add(customerBulkUpload);
                                    var data = _context.CustomerBulkUpload.Add(customerBulkUpload);

                                    _context.SaveChanges();

                                }
                        }
                     

                    }
                }
                    //

                    foreach (CustomerBulkUpload i in finalUploadList)
                    {
                        //var data =  _context.CustomerBulkUpload.Add(i);

                        // _context.SaveChanges();
                        //CustomerBulkUploadStatus customerBulkUploadStatus = new CustomerBulkUploadStatus();
                        //customerBulkUploadStatus.CustomerBulkId = i.CustomerBulkId;
                        //customerBulkUploadStatus.FileName = i.FileName;
                        //customerBulkUploadStatus.Reason = i.Cif + " Onboarded successfully.";
                        //customerBulkUploadStatus.RowId = i.SiNo;
                        //customerBulkUploadStatus.Status = PayIsuAPIResponseEnum.Success.ToString();
                        //customerBulkUploadStatus.CreatedBy = 1;
                        //customerBulkUploadStatus.CreatedDate = DateTime.Now;
                        //customerBulkUploadStatus.IsActive = true;

                        //var data1 = _context.CustomerBulkUploadStatus.Add(customerBulkUploadStatus);
                        // _context.SaveChanges();
                       // await _customerOnboardMethodBusiness.AddCustomerOnboardMethod(i.Cif, "B");
                      
                    }
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Customer bulk upload successful", "");
                    ///
                }
            else
            {
                    CustomerBulkUploadStatus customerBulkUpload = new CustomerBulkUploadStatus();
                    customerBulkUpload.CustomerBulkId = 0;
                    customerBulkUpload.FileName = FormFile.FileName;
                    customerBulkUpload.Reason = "File Already Uploaded";
                    customerBulkUpload.RowId = vSino;
                    customerBulkUpload.Status = PayIsuAPIResponseEnum.Error.ToString();
                    customerBulkUpload.CreatedBy =1;
                    customerBulkUpload.CreatedDate =DateTime.Now;
                    customerBulkUpload.IsActive =true;

                   await SaveCustomerBulkUploadStatus(customerBulkUpload);
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "File already uploaded.", "");

                }

            }
            catch (Exception ex)
            {
                CustomerBulkUploadStatus customerBulkUpload = new CustomerBulkUploadStatus();
                customerBulkUpload.CustomerBulkId = 0;
                customerBulkUpload.FileName = FormFile.FileName;
                customerBulkUpload.Reason = ex.Message;
                customerBulkUpload.RowId = 0;
                customerBulkUpload.Status = PayIsuAPIResponseEnum.Error.ToString();
                customerBulkUpload.CreatedBy = 1;
                customerBulkUpload.CreatedDate = DateTime.Now;
                customerBulkUpload.IsActive = true;

                await SaveCustomerBulkUploadStatus(customerBulkUpload);
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Error", "");
            }



        }

        private string FormatDecimal(string text)
        {
            string output = string.Empty;
            if (string.IsNullOrEmpty(text))
            {
                output = "0";
            }
            else
            {
                output = text;
            }
            return output;
        }

        private DateTime? FormatDate(string text)
        {
            DateTime? output;
            try
            {
                if (!string.IsNullOrEmpty(text))
                {
                    output = DateTime.Parse(text);
                }
                else
                {
                    output = null;
                }
                return output;
            }
            catch (Exception ex)
            {

                return null ;
            }
          

          
        }

        private async Task SaveCustomer(CustomerBulkUpload customerBulkUpload)
        {
            try
            {
                //   using (_context)
                //   {


                // await SaveCustomerBulkUploadStatus(customerBulkUploadStatus);
                //   }

              //  await _customerOnboardMethodBusiness.SaveCustomerAlt(customerBulkUpload);




                await _customerOnboardMethodBusiness.AddCustomerOnboardMethod(customerBulkUpload.Cif, "B");
            }
            catch (Exception ex)
            {

                throw;
            }
              
        
        }
        private async Task SaveCustomerBulkUploadStatus(CustomerBulkUploadStatus customerBulkUpload)
        {
        
            var data = _context.CustomerBulkUploadStatus.Add(customerBulkUpload);

            await _context.SaveChangesAsync();

        }
        public APIResponse GetBulkCustomerByCif(int cif)
        {
            try
            {
                var bulkCustomer =  _context.CustomerBulkUpload.FirstOrDefault(b => b.Cif == cif);

            

                if (bulkCustomer == null)
                {
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Customer find by cif unsucessfuly", cif);
                }
                else
                {
                    //Customer customer = new Customer();
                    //customer = mapBulkCustomerToIndividua(bulkCustomer);
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Customer find by cif", bulkCustomer);

                }

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<APIResponse> GetAllBulkCustomer()
        {
            var list = await _context.CustomerBulkUpload.OrderByDescending(s => s.CreatedDate).Take(500).ToListAsync();

           List<MemberModel> memberModellist = new List<MemberModel>();
           
            
            foreach (CustomerBulkUpload i in list)
            {
                MemberModel memberModel = new MemberModel();

                memberModel.CustomerBulkUpload = i;
                if (i.parentCustomerId > 0)
                {
                    var customer = (Customer)_customerBusiness.GetById(i.parentCustomerId).Data;
                    memberModel.Customer = customer;
                }
                else
                {
                    var customer = new Customer();
                    memberModel.Customer = customer;
                }
               

                memberModellist.Add(memberModel);
            }

            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Get all bulk customer", memberModellist);

        }

        private Customer mapBulkCustomerToIndividua(CustomerBulkUpload customerBulkUpload)
        {
            Customer customer = new Customer();
            customer.Cif = customerBulkUpload.Cif;
            customer.CustomerName = customerBulkUpload.InsuredName;

            return customer;
        }

        public async Task<APIResponse> GetBulkCustomerUploadStatus(string fileName)
        {
            try
            {

                var list = await _context.CustomerBulkUploadStatus.Where(s => s.FileName == fileName && s.IsActive == true).ToListAsync();

                var totalCount = list.Count;
                var successCount = list.Count(s => s.Status == PayIsuAPIResponseEnum.Success.ToString());
                var errorCount = list.Count(s => s.Status == PayIsuAPIResponseEnum.Error.ToString());

                var finalMsg = "Total " + totalCount +" records have uploaded." + "Total Success records "+ successCount + " Total failed records "+ errorCount;
                if (errorCount > 0)
                {
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Get bulk customer status", finalMsg);

                }
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Get bulk customer status", finalMsg);

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<APIResponse> GetBulkCustomerByCustomerId(int customerId)
        {
            var list = await _context.CustomerBulkUpload.Where(s => s.parentCustomerId == customerId && s.IsActive == true).OrderByDescending(s => s.CreatedDate).ToListAsync();

            List<MemberModel> memberModellist = new List<MemberModel>();


            foreach (CustomerBulkUpload i in list)
            {
                MemberModel memberModel = new MemberModel();

                memberModel.CustomerBulkUpload = i;
                if (i.parentCustomerId > 0)
                {
                    var customer = (Customer)_customerBusiness.GetById(i.parentCustomerId).Data;
                    memberModel.Customer = customer;
                }
                else
                {
                    var customer = new Customer();
                    memberModel.Customer = customer;
                }


                memberModellist.Add(memberModel);
            }

            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Get all bulk customer", memberModellist);

        }
    }
}
