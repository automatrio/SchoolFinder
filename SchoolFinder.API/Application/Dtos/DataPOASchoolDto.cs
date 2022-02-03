using System.Text.Json.Serialization;

namespace SchoolFinder.Application.Dtos
{
    public class DataPOASchoolDto
    {
        public int Id { get; set; }

        [JsonPropertyName("_id")]
        public int SchoolId { get; set; }

        [JsonPropertyName("dep_administrativa")]
        public string AdministrativeDepartment{ get; set; } //MUNICIPAL

        [JsonPropertyName("tipo")]
        public string Type { get; set; } //EDUCAÇÃO INFANTIL
        
        [JsonPropertyName("nome")]
        public string Name { get; set; } //EMEI JP CANTINHO AMIGO                                  
        
        [JsonPropertyName("abr_nome")]
        public string NickName { get; set; } // CANTINHO                      
        
        [JsonPropertyName("logradouro")]
        public string Address { get; set; } //PCA GARIBALDI                                     
        
        [JsonPropertyName("numero")]
        public int AddressNumber { get; set; } //1
        
        [JsonPropertyName("bairro")]
        public string Neighborhood { get; set; }        
        
        [JsonPropertyName("cep")]
        public string ZipCode { get; set; }
        
        [JsonPropertyName("latitude")]
        public float Latitude { get; set; }
        
        [JsonPropertyName("longitude")]
        public float Longitude { get; set; }
        
        [JsonPropertyName("telefone")]
        public string TelephoneNumber { get; set; }            
        
        [JsonPropertyName("email")]
        public string Email { get; set; }        
        
        [JsonPropertyName("url_website")]
        public string Website { get; set; }                                       
        
        [JsonPropertyName("blog")]
        public string Blog { get; set; }
        
        [JsonPropertyName("twitter")]
        public string Twitter { get; set; }
        
        [JsonPropertyName("facebook")]
        public string Facebook { get; set; }

        [JsonPropertyName("situacao_funcionamento")]
        public string Situation { get; set; } //EM ATIVIDADE
    }
}