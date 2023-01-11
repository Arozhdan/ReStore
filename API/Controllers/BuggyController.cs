
using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	public class BuggyController : BaseApiController
	{
		[HttpGet("not-found")]
		public ActionResult GetNotFoundRequest()
		{
			return NotFound();
		}

		[HttpGet("bad-request")]
		public ActionResult GetBadRequest()
		{
			return BadRequest(new ProblemDetails { Title = "This is a bad request" });
		}

		[HttpGet("unauthorized")]
		public ActionResult GetUnauthorizedRequest()
		{
			return Unauthorized();
		}

		[HttpGet("validation-error")]
		public ActionResult GetValidationError()
		{
			ModelState.AddModelError("Problem1", "This is a validation error #1");
			ModelState.AddModelError("Problem2", "This is a validation error #2");
			return ValidationProblem();
		}

		[HttpGet("server-error")]
		public ActionResult GetServerError()
		{
			throw new Exception("This is a server error");
		}

	}
}