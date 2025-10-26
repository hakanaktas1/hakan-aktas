"use client"
import React, { useState, useEffect } from 'react';

export default function Portfolio() {
  const [data, setData] = useState<any>({
    profile: {},
    experience: [],
    education: [],
    projects: [],
    blogs: [],
    seminars: []
  });

  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [selectedSeminar, setSelectedSeminar] = useState(null);


  // JSON'ları yükle
  useEffect(() => {
    const loadData = async () => {
      try {
        const [profile, experience, education, projects, blogs, seminars] = await Promise.all([
          fetch('/data/profile.json').then(res => res.json()),
          fetch('/data/experience.json').then(res => res.json()),
          fetch('/data/education.json').then(res => res.json()),
          fetch('/data/projects.json').then(res => res.json()),
          fetch('/data/blogs.json').then(res => res.json()),
          fetch('/data/seminars.json').then(res => res.json())
        ]);

        setData({ profile, experience, education, projects, blogs, seminars });
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experience', 'education', 'projects', 'blogs', 'seminars', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div style={{
        background: '#0a0a0a',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      background: '#0a0a0a',
      color: '#fff',
      margin: 0,
      padding: 0
    }}>
      {/* Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        padding: '30px',
        background: 'rgba(0, 0, 0, 0.5)',
        position: 'sticky',
        top: 0,
        zIndex: 100 
      }}>
        {['home', 'experience', 'education', 'projects', 'blogs', 'seminars', 'contact'].map(section => (
          <a
            key={section}
            href={`#${section}`}
            onClick={(e) => { e.preventDefault(); scrollTo(section); }}
            style={{
              color: activeSection === section ? '#fff' : '#999',
              textDecoration: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'color 0.3s',
              textTransform: 'capitalize'
            }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#fff'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = activeSection === section ? '#fff' : '#999'}
          >
            {section}
          </a>
        ))}
      </nav>

      {/* HOME */}
      <section id="home" style={{ minHeight: '100vh', padding: '80px 100px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: '100px'
        }}>
          <div>
            <h1 style={{
              fontSize: '72px',
              fontWeight: 700,
              marginBottom: '20px',
              lineHeight: 1.1
            }}>
              {data.profile.name}
            </h1>
            <h2 style={{
              fontSize: '24px',
              color: '#999',
              fontWeight: 400,
              marginBottom: '30px'
            }}>
              {data.profile.title}
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#ccc',
              lineHeight: 1.6,
              marginBottom: '40px',
              maxWidth: '500px'
            }}>
              {data.profile.description}
            </p>
            
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#00ff88',
                  color: '#000',
                  padding: '18px 40px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#00dd77';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#00ff88';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                Explore My Work →
              </a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <img
              src="/hakan.webp"
              alt={data.profile.name}
              style={{
                width: '450px',
                height: '450px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #333',
                transition: 'box-shadow 320ms cubic-bezier(.2,.8,.2,1), transform 320ms cubic-bezier(.2,.8,.2,1), border-color 280ms ease',
                boxShadow: '0 8px 20px rgba(0,0,0,0.45)'
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                // soft, professional green glow + subtle lift
                el.style.boxShadow = '0 10px 30px rgba(0,0,0,0.45), 0 6px 20px rgba(141, 151, 146, 0.1)';
                el.style.borderColor = '#8cd7afff';
                el.style.transform = 'translateY(-2px)';
                el.style.filter = 'saturate(1.03)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.45)';
                el.style.borderColor = '#333';
                el.style.transform = 'translateY(0)';
                el.style.filter = 'none';
              }}
            />
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ minHeight: '100vh', padding: '80px 100px' }}>
        <h2 style={{ fontSize: '48px', marginBottom: '60px', textAlign: 'center' }}>
          Experience
        </h2>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {data.experience.map((exp: any) => (
            <div key={exp.id} style={{
              background: '#1a1a1a',
              padding: '30px',
              borderRadius: '12px',
              marginBottom: '30px',
              borderLeft: '4px solid #00ff88'
            }}>
              <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>{exp.title}</h3>
              <div style={{ color: '#00ff88', fontSize: '18px', marginBottom: '8px' }}>
                {exp.company}
              </div>
              <div style={{ color: '#999', fontSize: '14px', marginBottom: '15px' }}>
                📍 {exp.location} | 🗓️ {exp.period}
              </div>
              <p style={{ color: '#ccc', lineHeight: 1.6, marginBottom: '15px' }}>
                {exp.description}
              </p>
              <ul style={{ color: '#ccc', paddingLeft: '20px', lineHeight: 1.8 }}>
                {exp.achievements.map((achievement: any, i: number) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ minHeight: '100vh', padding: '80px 100px' }}>
        <h2 style={{ fontSize: '48px', marginBottom: '60px', textAlign: 'center' }}>
          🎓 Education
        </h2>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {data.education.map((edu: any) => (
            <div key={edu.id} style={{
              background: '#1a1a1a',
              padding: '30px',
              borderRadius: '12px',
              marginBottom: '30px',
              borderLeft: '4px solid #00ff88'
            }}>
              <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>{edu.degree}</h3>
              <div style={{ color: '#00ff88', fontSize: '18px', marginBottom: '8px' }}>
                {edu.school}
              </div>
              <div style={{ color: '#999', fontSize: '14px', marginBottom: '15px' }}>
                📍 {edu.location} | 🗓️ {edu.period}
              </div>
              <p style={{ color: '#ccc', lineHeight: 1.6 }}>
                {edu.details}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ minHeight: '100vh', padding: '80px 100px' }}>
        <h2 style={{ fontSize: '48px', marginBottom: '60px', textAlign: 'center' }}>
          Projects
        </h2>

        {/* Grid yapısı */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          {data.projects.map((project: any) => (
            <div
              key={project.id}
              style={{
                background: '#1a1a1a',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onClick={() => {
                setSelectedProject(project);
                setFadeIn(true);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '200px',
                  background: '#2a2a2a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                {project.image ? (
                  <img
                    src={`/${project.image}`}
                    alt={project.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s'
                    }}
                  />
                ) : (
                  <span style={{ color: '#666' }}>No Image</span>
                )}
              </div>
              <div style={{ padding: '25px' }}>
                <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>{project.name}</h3>
                <p style={{ color: '#999', lineHeight: 1.6, marginBottom: '15px' }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.tags.map((tag: any, i: number) => (
                    <span
                      key={i}
                      style={{
                        background: '#2a2a2a',
                        padding: '5px 12px',
                        borderRadius: '5px',
                        fontSize: '12px',
                        color: '#00ff88'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProject && (
          <div
            onClick={() => {
              setFadeIn(false);
              setTimeout(() => setSelectedProject(null), 300);
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.85)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
              opacity: fadeIn ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#1a1a1a',
                borderRadius: '12px',
                maxWidth: '800px',
                width: '90%',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                overflow: 'hidden',
                transform: fadeIn ? 'translateY(0)' : 'translateY(-20px)',
                transition: 'all 0.3s ease'
              }}
            >
              <img
                src={`/${selectedProject.image}`}
                alt={selectedProject.name}
                style={{
                  width: '100%',
                  maxHeight: '450px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '25px' }}>
                <h3 style={{ fontSize: '26px', marginBottom: '15px' }}>
                  {selectedProject.name}
                </h3>
                <p style={{ color: '#ccc', lineHeight: 1.7, marginBottom: '20px' }}>
                  {selectedProject.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedProject.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      style={{
                        background: '#2a2a2a',
                        padding: '6px 14px',
                        borderRadius: '5px',
                        fontSize: '13px',
                        color: '#00ff88'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>


      {/* BLOGS */}
      <section id="blogs" style={{ minHeight: '100vh', padding: '80px 100px' }}>
        <h2 style={{ fontSize: '48px', marginBottom: '60px', textAlign: 'center' }}>
          ✍️ Blogs
        </h2>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {data.blogs.map((blog: any) => (
            <a
              key={blog.id}
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <div
                style={{
                  background: '#1a1a1a',
                  padding: '30px',
                  borderRadius: '12px',
                  marginBottom: '25px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '25px',
                  transition: 'background 0.3s, transform 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#252525';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1a1a1a';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Sol taraf: metin */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>
                    {blog.title}
                  </h3>
                  <div
                    style={{
                      color: '#00ff88',
                      fontSize: '14px',
                      marginBottom: '12px'
                    }}
                  >
                    Published: {blog.date}
                  </div>
                  <p style={{ color: '#ccc', lineHeight: 1.6 }}>{blog.summary}</p>
                </div>

                {/* Sağ taraf: resim */}
                {blog.image && (
                  <div
                    style={{
                      flexShrink: 0,
                      width: '250px',
                      height: '150px',
                      overflow: 'hidden',
                      borderRadius: '8px'
                    }}
                  >
                    <img
                      src={`/${blog.image}`}
                      alt={blog.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s'
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = 'scale(1.05)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = 'scale(1)')
                      }
                    />
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </section>
      {/* SEMINARS */}
      <section id="seminars" style={{ minHeight: '100vh', padding: '80px 100px' }}>
        <h2 style={{ fontSize: '48px', marginBottom: '60px', textAlign: 'center' }}>
          🎤 Seminars & Talks
        </h2>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {Array.isArray(data?.seminars) && data?.seminars.map((seminar: any) => (
            <div
              key={seminar.id}
              onClick={() => setSelectedSeminar(seminar)}
              style={{
                background: '#1a1a1a',
                padding: '30px',
                borderRadius: '12px',
                marginBottom: '25px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '1px solid #2a2a2a',
                transform: 'scale(1)',
                display: 'flex',
                alignItems: 'center',
                gap: '25px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                e.currentTarget.style.background = '#1f1f1f';
                e.currentTarget.style.border = '1px solid #00ff88';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 136, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = '#1a1a1a';
                e.currentTarget.style.border = '1px solid #2a2a2a';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* İçerik - Sol taraf */}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#fff' }}>{seminar.title}</h3>
                <div style={{ color: '#00ff88', fontSize: '14px', marginBottom: '12px' }}>
                  {seminar.event} | {seminar.date}
                </div>
                <p style={{ color: '#ccc', lineHeight: 1.6 }}>
                  {seminar.description.length > 120
                    ? seminar.description.slice(0, 120) + '...'
                    : seminar.description}
                </p>
              </div>

              {/* Resim - Sağ taraf */}
              {seminar.image && (
                <div style={{
                  width: '120px',
                  height: '80px',
                  flexShrink: 0
                }}>
                  <img
                    src={seminar.image}
                    alt={seminar.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '1px solid #2a2a2a'
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* POPUP (MODAL) - ESKİ HALİ */}
        {selectedSeminar && (
          <div
            onClick={() => setSelectedSeminar(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              animation: 'fadeIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(145deg, #121212, #1a1a1a)',
                padding: '50px',
                borderRadius: '20px',
                width: '90%',
                maxWidth: '800px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 50px rgba(0, 255, 136, 0.15)',
                animation: 'modalSlideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
                border: '1px solid rgba(0, 255, 136, 0.1)',
                position: 'relative',
                transform: 'scale(0.9)',
                opacity: 0
              }}
            >
              {selectedSeminar.image && (
                <img
                  src={selectedSeminar.image}
                  alt={selectedSeminar.title}
                  style={{
                    width: '100%',
                    borderRadius: '16px',
                    marginBottom: '30px',
                    border: '1px solid #2a2a2a',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)'
                  }}
                />
              )}
              
              <h3 style={{ 
                fontSize: '32px', 
                marginBottom: '15px', 
                color: '#fff',
                fontWeight: '700',
                lineHeight: 1.3,
                background: 'linear-gradient(135deg, #fff 0%, #00ff88 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {selectedSeminar.title}
              </h3>
              
              <div style={{ 
                color: '#00ff88', 
                fontSize: '16px', 
                marginBottom: '25px',
                fontWeight: '500',
                letterSpacing: '0.5px'
              }}>
                {selectedSeminar.event} | {selectedSeminar.date}
              </div>
              
              <p style={{ 
                color: '#e0e0e0', 
                lineHeight: 1.8,
                fontSize: '17px',
                marginBottom: '10px',
                textAlign: 'justify'
              }}>
                {selectedSeminar.description}
              </p>

              {selectedSeminar.location && (
                <div style={{
                  marginTop: '25px',
                  padding: '20px',
                  background: 'rgba(0, 255, 136, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 255, 136, 0.1)'
                }}>
                  <div style={{ color: '#00ff88', fontSize: '15px', marginBottom: '8px', fontWeight: '600' }}>
                    📍 Event Location
                  </div>
                  <div style={{ color: '#ccc', fontSize: '15px' }}>
                    {selectedSeminar.location}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
      {/* CONTACT */}
      <section id="contact" style={{ minHeight: '100vh', padding: '80px 100px' }}>
        <h2 style={{ fontSize: '48px', marginBottom: '60px', textAlign: 'center' }}>
          📬 Get In Touch
        </h2>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#ccc', fontSize: '18px', marginBottom: '40px' }}>
            Feel free to reach out for collaborations, opportunities, or just to say hi!
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
            <a href={`mailto:${data.profile.email}`} style={{
              color: '#00ff88',
              textDecoration: 'none',
              fontSize: '18px',
              transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#00dd77'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#00ff88'}
            >
              Email
            </a>
            <a href={`https://linkedin.com/in/${data.profile.linkedin}`} target="_blank" rel="noopener noreferrer" style={{
              color: '#00ff88',
              textDecoration: 'none',
              fontSize: '18px',
              transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#00dd77'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#00ff88'}
            >
              LinkedIn
            </a>
            <a href={`https://github.com/${data.profile.github}`} target="_blank" rel="noopener noreferrer" style={{
              color: '#00ff88',
              textDecoration: 'none',
              fontSize: '18px',
              transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#00dd77'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#00ff88'}
            >
              GitHub
            </a>
            <a href={`https://twitter.com/${data.profile.twitter}`} target="_blank" rel="noopener noreferrer" style={{
              color: '#00ff88',
              textDecoration: 'none',
              fontSize: '18px',
              transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#00dd77'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#00ff88'}
            >
              Twitter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
