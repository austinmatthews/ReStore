//Needed for API functions
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  //Gives the class api abilities
  //Need to extend controllerBase
  //Dependency injection - pass in objects that the current object needs instead of creating the objects internally
  [ApiController]
  [Route("api/[controller]")]
  public class BaseApiController : ControllerBase { }
}
