using System.ComponentModel.DataAnnotations;

namespace SchoolFinder.Data.Models
{
    public class SchoolAdministrativeDepartment
    {
        [Key]
        public int Id { get; set; }
        public string ImageSrc { get; set; }
        public string Title { get; set; }
        public string Color { get; set; }
    }
}