using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SchoolFinder.Application;
using SchoolFinder.Application.Dtos;
using SchoolFinder.Common;
using SchoolFinder.Data;
using SchoolFinder.Data.Models;
using SchoolFinder.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolFinder.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SchoolController : ControllerBase
    {
        private readonly ISchoolRepository schoolRepository;

        public SchoolController(ISchoolRepository schoolRepository)
        {
            this.schoolRepository = schoolRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll([FromQuery] SchoolFilter filter)
        {
            var response = new HttpResponse<dynamic>();
            try
            {
                var result = (await this.schoolRepository
                    .GetAll(filter));

                response.Count = result.Count();

                result = result
                    .Skip(filter.PageNumber * filter.PaginationSize)
                    .Take(filter.PaginationSize);


                response.Data = result.ToList();
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Errors = new List<string>()
                {
                    $"Error at: {this.GetType().Name}",
                    ex.Message,
                };
                return BadRequest(response);
            }
        }

        [HttpGet("{id}")]
        public virtual async Task<IActionResult> GetById(int id)
        {
            var response = new HttpResponse<School>();
            try
            {
                var result = await schoolRepository.GetByIdAsync(id);
                response.Count = 1;
                response.Data = new List<School>()
                {
                    result
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Errors = new List<string>()
                {
                    $"Error at: {this.GetType().Name}",
                    ex.Message,
                };
                return BadRequest(response);
            }
        }
    }
}