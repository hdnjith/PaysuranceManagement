using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessObjectLayer
{
    public class FileModel
    {
        public IFormFile FormFile { get; set; }
        public string FileName { get; set; }
        public string ChannelId { get; set; }
        public int CreatedBy { get; set; }
        public bool isActive { get; set; }
        public int CustomerId { get; set; }

    }
}
