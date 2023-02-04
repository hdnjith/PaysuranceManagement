using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BusinessObjectLayer;

namespace DataAccessLayer.Data
{
    public class PaysuranceManagementContext : DbContext
    {
        public PaysuranceManagementContext(DbContextOptions<PaysuranceManagementContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<BusinessObjectLayer.Claim> Claim { get; set; }
        public DbSet<BusinessObjectLayer.InsuranceCompany> InsuranceCompany { get; set; }
        public DbSet<BusinessObjectLayer.Product> Product { get; set; }
        public DbSet<BusinessObjectLayer.Hospital> Hospital { get; set; }
        public DbSet<BusinessObjectLayer.Ailment> Ailment { get; set; }
        public DbSet<BusinessObjectLayer.Customer> Customer { get; set; }
        public DbSet<BusinessObjectLayer.CustomerBulkUpload> CustomerBulkUpload { get; set; }
        public DbSet<BusinessObjectLayer.CustomerOnboardMethod> CustomerOnboardMethod { get; set; }
        public DbSet<BusinessObjectLayer.Policy> Policy { get; set; }
        public DbSet<BusinessObjectLayer.PolicyCoverage> PolicyCoverage { get; set; }
        public DbSet<BusinessObjectLayer.CustomerBulkUploadStatus> CustomerBulkUploadStatus { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasSequence<int>("CustomerIdentificationNumber").StartsAt(10000)
                .IncrementsBy(1);
            modelBuilder.HasSequence<int>("ClaimNumber").StartsAt(1000)
              .IncrementsBy(1);
            modelBuilder.HasSequence<int>("PolicyNo").StartsAt(1000)
          .IncrementsBy(1);

            modelBuilder.Entity<CustomerBulkUpload>()
                .Property(o => o.Cif)
                .HasDefaultValueSql("NEXT VALUE FOR CustomerIdentificationNumber");

            modelBuilder.Entity<Customer>()
           .Property(o => o.Cif)
           .HasDefaultValueSql("NEXT VALUE FOR CustomerIdentificationNumber");

            modelBuilder.Entity<Claim>()
             .Property(o => o.ClaimRef)
             .HasDefaultValueSql("NEXT VALUE FOR ClaimNumber");
        }
       
    }
}
