using System;
using AutoMapper;
using SchoolFinder.Application.Dtos;
using SchoolFinder.Data.Enums;
using SchoolFinder.Data.Models;

namespace SchoolFinder.Data
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<DataPOASchoolDto, School>()
                .ForMember(
                    entity => entity.SchoolTypeId,
                    options => options.MapFrom(new SchoolTypeResolver())
                ).ForMember(
                    entity => entity.SchoolAdministrativeDepartmentId,
                    options => options.MapFrom(new SchoolAdministrativeDepartmentResolver())
                );
            CreateMap<School, SchoolDto>().ReverseMap();
            CreateMap<SchoolType, SchoolTypeDto>().ReverseMap();
            CreateMap<SchoolAdministrativeDepartment, SchoolAdministrativeDepartmentDto>().ReverseMap();
        }
    }

    class SchoolTypeResolver : IValueResolver<DataPOASchoolDto, School, int> {
        public int Resolve(DataPOASchoolDto source, School dest, int destMember, ResolutionContext context) {
            string sourceType;
            if (source.Type.ToUpper().Contains("MÉDIO"))
            {
                return (int) ESchoolType.EnsinoMédio;
            }
            else if (source.Type.ToUpper().Contains("NI"))
            {
                return (int) ESchoolType.EducaçãoInfantil;
            }
            else
            {
                sourceType = source.Type.Replace(" ", string.Empty);
            }

            if (Enum.TryParse(typeof(ESchoolType), sourceType, true, out var enumResult))
                return (int) enumResult;
            return (int) ESchoolType.TodosOsNíveis;
        }
    }
    class SchoolAdministrativeDepartmentResolver : IValueResolver<DataPOASchoolDto, School, int> {
        public int Resolve(DataPOASchoolDto source, School dest, int destMember, ResolutionContext context) {
            string sourceAdministrativeDepartment;
            if (source.AdministrativeDepartment.Contains("MUNICIPAL"))
            {
                return (int) ESchoolAdministrativeDepartment.Público;
            }
            else 
            {
                sourceAdministrativeDepartment = source.AdministrativeDepartment.Replace(" ", string.Empty);
            }

            if (Enum.TryParse(typeof(ESchoolAdministrativeDepartment), sourceAdministrativeDepartment, out var enumResult))
                return (int) enumResult;
            return (int) ESchoolAdministrativeDepartment.TodosOsSetores;
        }
    }
}