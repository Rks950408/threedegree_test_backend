import { useState } from "react";
import { Container, Box, Typography, Grid, Card, CardContent, CardMedia, Button, CardActionArea } from "@mui/material";
import BlogDetail from "../components/BlogDetail";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  
  // Sample blog data
  const blogs = [
    {
      id: 1,
      title: "Spiritual Journey to Dharamshala",
      excerpt: "Discover the mystical beauty and spiritual essence of Dharamshala, home to His Holiness the Dalai Lama.",
      image: "/images/blog/dharamshala.jpg",
      content: `
        <h2>Dharamshala: A Himalayan Sanctuary of Peace</h2>
        
        <p>Nestled in the foothills of the majestic Himalayas, Dharamshala is a breathtaking mountain town in Himachal Pradesh that serves as the residence of His Holiness the Dalai Lama and the Tibetan government-in-exile. This enchanting destination offers not just stunning natural beauty, but also a profound spiritual experience that touches the soul.</p>
        
        <img src="/images/blog/dharamshala-mountains.png" alt="Dharamshala Mountains" style="width: 100%; border-radius: 8px; margin: 20px 0;" />
        
        <p>The town is divided into two distinct areas: Lower Dharamshala, which is the administrative center with government offices and commercial areas, and Upper Dharamshala (also known as McLeod Ganj), which is the cultural heart and spiritual center. McLeod Ganj is where you'll find the Dalai Lama's residence, numerous Tibetan monasteries, and a vibrant community of Tibetan refugees who have kept their rich cultural heritage alive.</p>
        
        <h3>Spiritual Centers to Visit</h3>
        
        <p>The Tsuglagkhang Complex (Dalai Lama's Temple) is the spiritual heart of Dharamshala. This sacred complex houses the Photang (Dalai Lama's residence), the Namgyal Monastery, and the Tibet Museum. Visitors can circumambulate the temple, spin prayer wheels, and meditate in the peaceful atmosphere charged with centuries of spiritual practice.</p>
        
        <img src="/images/blog/tibetan-flags.webp" alt="Tibetan prayer flags" style="width: 100%; border-radius: 8px; margin: 20px 0;" />
        
        <p>Another must-visit is the Norbulingka Institute, dedicated to preserving Tibetan arts and culture. Here, you can witness artisans practicing traditional crafts such as thangka painting, wood carving, and statue making. The institute also houses a beautiful Japanese-inspired garden, a café serving authentic Tibetan cuisine, and a temple with stunning murals.</p>
        
        <h3>Natural Beauty</h3>
        
        <p>Beyond its spiritual significance, Dharamshala is blessed with extraordinary natural beauty. The town offers panoramic views of the snow-capped Dhauladhar range, dense pine forests, and cascading waterfalls. The Bhagsu Waterfall, located near the village of Bhagsu, is a popular spot for visitors seeking natural beauty and tranquility.</p>
        
        <p>For the more adventurous, the Triund trek offers a moderate hiking experience with breathtaking views of the Kangra Valley and the Dhauladhar range. The trek takes approximately 3-4 hours and is suitable for most fitness levels.</p>
        
        <h3>When to Visit</h3>
        
        <p>The best time to visit Dharamshala is from March to June, when the weather is pleasant and ideal for outdoor activities. September to November also offers comfortable temperatures and clear skies, perfect for mountain views. If you're interested in attending the Dalai Lama's teachings, it's advisable to check the schedule on his official website as these sessions are held at various times throughout the year.</p>
        
        <p>Whether you're seeking spiritual enlightenment, cultural immersion, or natural beauty, Dharamshala offers a unique blend of experiences that will leave a lasting impression on your soul.</p>
      `
    },
    {
      id: 2,
      title: "Exploring Tibetan Culture in Exile",
      excerpt: "Learn about the vibrant Tibetan community and their efforts to preserve their cultural heritage in Dharamshala.",
      image: "/images/blog/tibetan-culture.jpg",
      content: "Detailed content about Tibetan culture in Dharamshala..."
    },
    {
      id: 3,
      title: "The Healing Powers of Himalayan Yoga",
      excerpt: "Experience the transformative practice of yoga in the mountains with ancient traditions and modern approaches.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2622&auto=format&fit=crop",
      content: "Detailed content about yoga practices in Dharamshala..."
    },
    {
      id: 4,
      title: "Triund Trek: A Journey to the Clouds",
      excerpt: "Discover the popular Triund trek that offers breathtaking views of the Dhauladhar range and Kangra Valley.",
      image: "/images/blog/triund-trek.jpg",
      content: "Detailed content about Triund trek..."
    },
    {
      id: 5,
      title: "Tibetan Cuisine: A Taste of the Himalayas",
      excerpt: "Explore the unique flavors and traditions of Tibetan cuisine available in the streets of McLeod Ganj.",
      image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2071&auto=format&fit=crop",
      content: "Detailed content about Tibetan cuisine..."
    },
    {
      id: 6,
      title: "The Art of Tibetan Thangka Painting",
      excerpt: "Learn about the ancient tradition of Thangka painting and its spiritual significance in Buddhist culture.",
      image: "/images/blog/thangka.jpg",
      content: "Detailed content about Thangka painting..."
    }
  ];

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleCloseDetail = () => {
    setSelectedBlog(null);
  };

  return (
    <Box sx={{ backgroundColor: "#f8eee4", width: "100%" }}>
      {/* Hero Section with Header Image */}
      <Box
        sx={{
          width: "100%",
          height: "400px",
          position: "relative",
          marginTop: "30px",
        }}
      >
        <img 
          src="/images/blog/header.jpg" 
          alt="Blog Header"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontFamily: "Josefin Sans",
              fontWeight: 600,
              textAlign: "center",
              fontSize: { xs: "2.5rem", md: "4rem" },
              letterSpacing: "0.1em",
              textShadow: "2px 2px 4px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.3)",
            }}
          >
            OUR BLOG
          </Typography>
        </div>
      </Box>

      {/* Blog Cards Section */}
      <Box sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, md: 6 } }}>
        <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
          <Box 
            sx={{ 
              display: "grid", 
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              gap: 4,
            }}
          >
            {blogs.map((blog) => (
              <Box key={blog.id}>
                <Card 
                  sx={{ 
                    height: "450px", 
                    display: "flex", 
                    flexDirection: "column",
                    overflow: "hidden",
                    borderRadius: "12px",
                    boxShadow: "0 8px 40px rgba(208, 120, 80, 0.15)",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    backgroundColor: "#fff",
                    border: "1px solid rgba(208, 120, 80, 0.1)",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 16px 70px rgba(208, 120, 80, 0.25)",
                    }
                  }}
                  onClick={() => handleBlogClick(blog)}
                >
                  <CardActionArea sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                    <CardMedia
                      component="img"
                      height="260"
                      image={blog.image}
                      alt={blog.title}
                      sx={{ 
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        }
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 3, pb: 4, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <Box>
                        <Typography 
                          gutterBottom 
                          variant="h5" 
                          component="div"
                          sx={{
                            fontFamily: "Josefin Sans",
                            fontWeight: 600,
                            mb: 2,
                            color: "#1C1C1C",
                            fontSize: "1.4rem",
                          }}
                        >
                          {blog.title}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          color="text.secondary"
                          sx={{
                            fontFamily: "Lato",
                            lineHeight: 1.6,
                            mb: 3,
                            color: "#555",
                            fontSize: "0.95rem",
                          }}
                        >
                          {blog.excerpt}
                        </Typography>
                      </Box>
                      <Button
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          textTransform: "none",
                          fontFamily: "Lato",
                          fontWeight: 500,
                          alignSelf: "flex-start",
                          color: "custom.terracotta",
                          p: 0,
                          "&:hover": {
                            backgroundColor: "transparent",
                            color: "#b04a26",
                          }
                        }}
                      >
                        Read More
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Blog Detail Popup */}
      {selectedBlog && (
        <BlogDetail blog={selectedBlog} onClose={handleCloseDetail} />
      )}
    </Box>
  );
};

export default Blog; 