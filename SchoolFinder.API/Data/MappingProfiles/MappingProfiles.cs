using AutoMapper;
using SchoolFinder.Application.Dtos;
using SchoolFinder.Data.Models;

namespace SchoolFinder.Data
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<DataPOASchoolDto, School>();
            CreateMap<School, SchoolDto>().ReverseMap();
        }
    }
}