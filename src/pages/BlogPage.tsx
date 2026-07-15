import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { blogPosts } from '../data/blogs';

export default function BlogPage() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nordic-bg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nordic-heading mb-4">Blog nije pronađen</h1>
          <Link to="/" className="text-edu-gold hover:underline">← Povratak na naslovnicu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nordic-bg py-12 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-nordic-text hover:text-edu-gold transition-colors font-semibold text-sm mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Povratak
        </Link>
        
        <article className="bg-nordic-card rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-nordic-border mb-12">
          <div className="mb-8">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${post.categoryColor}`}>
              {post.category}
            </span>
            <div className="flex items-center text-sm text-nordic-text/80 mt-4 font-medium">
              <Calendar size={14} className="mr-1.5" />
              {post.date}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-nordic-heading  mt-4 leading-tight">
              {post.title}
            </h1>
          </div>

          <div className="aspect-video w-full rounded-2xl overflow-hidden mb-10">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert prose-headings:text-nordic-heading prose-p:text-nordic-text prose-p:font-light prose-p:leading-relaxed max-w-none prose-a:text-edu-gold">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={index} className="list-disc pl-5 mb-4 text-nordic-text font-light">
                    <li>{paragraph.replace('- ', '')}</li>
                  </ul>
                );
              }
              if (paragraph.match(/^[0-9]+\./)) {
                return (
                  <ol key={index} className="list-decimal pl-5 mb-4 text-nordic-text font-light">
                    <li>{paragraph.replace(/^[0-9]+\.\\s*/, '')}</li>
                  </ol>
                );
              }
              if (paragraph.trim() === '') return null;
              return <p key={index} className="mb-4">{paragraph}</p>;
            })}
          </div>
        </article>

        {/* CTA Section */}
        <div className="bg-edu-gold/10 border-2 border-edu-gold/20 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-extrabold text-nordic-heading mb-4">
            Zanima vas više o našem vođenom pristupu?
          </h2>
          <p className="text-nordic-text font-light mb-8 max-w-xl mx-auto">
            Bilo da tražite mjesto za slobodnu igru, edukativne radionice ili tematske proslave rođendana - tu smo za vaša pitanja.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm font-semibold text-nordic-heading">
            <a href="mailto:hello@eduplay-pula.hr" className="flex items-center hover:text-edu-gold transition-colors">
              <Mail size={18} className="mr-2 text-edu-gold" />
              hello@eduplay-pula.hr
            </a>
            <span className="hidden sm:inline text-nordic-border">|</span>
            <span className="flex items-center">
              <Phone size={18} className="mr-2 text-edu-gold" />
              099 123 4567
            </span>
          </div>
          <Link to="/" className="inline-block mt-8 bg-edu-gold text-edu-cream font-bold px-8 py-3 rounded-full hover:bg-edu-gold/90 transition-all shadow-md hover:scale-105 active:scale-95">
            Rezerviraj posjet igraonici
          </Link>
        </div>

      </div>
    </div>
  );
}
