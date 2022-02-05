using System.ComponentModel.DataAnnotations;

namespace SchoolFinder.Application.Dtos
{
    public class SchoolTypeDto
    {
        [Key]
        public int Id { get; set; }
        public string ImageSrc { get; set; }
        public string Title { get; set; }
        public string Color { get; set; }
    }
}