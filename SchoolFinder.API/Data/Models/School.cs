using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolFinder.Data.Models
{
    public class School
    {
        [Key]
        public int Id { get; set; }
        public int SchoolId { get; set; }
        public string AdministrativeDepartment { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }                                
        public string NickName { get; set; }                    
        public string Address { get; set; }                                   
        public int AddressNumber { get; set; }
        public string Neighborhood { get; set; }        
        public string ZipCode { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string TelephoneNumber { get; set; }            
        public string Email { get; set; }        
        public string Website { get; set; }                                       
        public string Blog { get; set; }
        public string Twitter { get; set; }
        public string Facebook { get; set; }
        public string Situation { get; set; }

        [NotMapped]
        public double Distance  { get; set;}
    }
}