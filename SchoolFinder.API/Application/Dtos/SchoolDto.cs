namespace SchoolFinder.Application.Dtos
{
    public class SchoolDto
    {
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
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string TelephoneNumber { get; set; }            
        public string Email { get; set; }        
        public string Website { get; set; }                                       
        public string Blog { get; set; }
        public string Twitter { get; set; }
        public string Facebook { get; set; }
        public string Situation { get; set; }
        public double Distance  { get; set;}
    }
}