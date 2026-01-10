import { Resume } from '@/types/resume';

const escapeLatex = (str: string) => {
    if (!str) return '';
    return str
        .replace(/\\/g, '\\\\')
        .replace(/&/g, '\\&')
        .replace(/%/g, '\\%')
        .replace(/\$/g, '\\$')
        .replace(/#/g, '\\#')
        .replace(/_/g, '\\_')
        .replace(/{/g, '\\{')
        .replace(/}/g, '\\}')
        .replace(/~/g, '\\textasciitilde')
        .replace(/\^/g, '\\textasciicircum');
};

export function resumeToLatex(resume: Resume): string {
    const { header, summary, education, experience, projects, skills } = resume;

    return `
\\documentclass[a4paper,10pt]{article}
\\usepackage[left=0.75in,top=0.6in,right=0.75in,bottom=0.6in]{geometry}
\\usepackage{hyperref}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{xcolor}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\begin{document}

\\begin{center}
    {\\Huge \\textbf{${escapeLatex(header.name)}}} \\\\ \\vspace{2pt}
    ${escapeLatex(header.email)} | ${escapeLatex(header.linkedin)} | ${escapeLatex(header.location)}
    ${header.portfolio ? `| ${escapeLatex(header.portfolio)}` : ''}
\\end{center}

\\section{Summary}
${escapeLatex(summary)}

\\section{Experience}
${experience.map(exp => `
\\noindent \\textbf{${escapeLatex(exp.role)}} \\hfill ${escapeLatex(exp.dates)} \\\\
\\textit{${escapeLatex(exp.company)}} \\hfill \\textit{${escapeLatex(exp.location)}}
\\begin{itemize}[noitemsep,topsep=0pt]
    ${exp.bullets.map(b => `\\item ${escapeLatex(b)}`).join('\n    ')}
\\end{itemize}
\\vspace{5pt}
`).join('\n')}

\\section{Projects}
${projects.map(proj => `
\\noindent \\textbf{${escapeLatex(proj.title)}} \\hfill ${escapeLatex(proj.dates)} \\\\
\\textit{${escapeLatex(proj.tech)}}
\\begin{itemize}[noitemsep,topsep=0pt]
    ${proj.bullets.map(b => `\\item ${escapeLatex(b)}`).join('\n    ')}
\\end{itemize}
\\vspace{5pt}
`).join('\n')}

\\section{Education}
${education.map(edu => `
\\noindent \\textbf{${escapeLatex(edu.institution)}} \\hfill ${escapeLatex(edu.dates)} \\\\
\\textit{${escapeLatex(edu.degree)}} \\hfill \\textit{${escapeLatex(edu.location)}}
${edu.bullets && edu.bullets.length > 0 ? `\\begin{itemize}[noitemsep,topsep=0pt]
    ${edu.bullets.map(b => `\\item ${escapeLatex(b)}`).join('\n    ')}
\\end{itemize}` : ''}
\\vspace{5pt}
`).join('\n')}

\\section{Skills}
\\begin{itemize}[noitemsep,topsep=0pt]
    ${skills.programming && skills.programming.length ? `\\item \\textbf{Programming:} ${escapeLatex(skills.programming.join(', '))}` : ''}
    ${skills.design && skills.design.length ? `\\item \\textbf{Design:} ${escapeLatex(skills.design.join(', '))}` : ''}
    ${skills.tools && skills.tools.length ? `\\item \\textbf{Tools:} ${escapeLatex(skills.tools.join(', '))}` : ''}
\\end{itemize}

\\end{document}
`;
}
