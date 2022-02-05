using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolFinder.Data.Models
{
    public class School
    {
        public virtual SchoolType SchoolType { get; set;}
        public virtual SchoolAdministrativeDepartment SchoolAdministrativeType { get; set;}

        public School()
        {
        }

        public School(
            int id,
            string address,
            string name,
            int addressNumber,
            double distance,
            double latitude,
            double longitude)
        {
            this.Id = id;
            this.Address = address; 
            this.Name = name; 
            this.AddressNumber = addressNumber; 
            this.Distance = distance; 
            this.Latitude = latitude; 
            this.Longitude = longitude; 
        }

        [Key]
        public int Id { get; set; }
        public int SchoolId { get; set; }
        public int SchoolAdministrativeDepartmentId { get; set; }
        public int SchoolTypeId { get; set; }
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