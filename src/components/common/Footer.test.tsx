import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

jest.mock('react-icons/fa', () => ({
  FaYoutube: () => <svg data-testid="youtube-icon" />,
  FaFacebook: () => <svg data-testid="facebook-icon" />,
  FaInstagram: () => <svg data-testid="instagram-icon" />,
}));

describe('Footer', () => {
  it('should render footer element', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');

    expect(footer).toBeInTheDocument();
  });

  it('should render logo image', () => {
    render(<Footer />);
    
    const logo = screen.getByAltText('Ice Dreams Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/vercel.svg');
  });

  it('should render social media section text', () => {
    render(<Footer />);
    
    expect(screen.getByText('Acompanhe nossas redes sociais:')).toBeInTheDocument();
  });

  it('should render social media icons', () => {
    render(<Footer />);
    
    expect(screen.getByTestId('youtube-icon')).toBeInTheDocument();
    expect(screen.getByTestId('facebook-icon')).toBeInTheDocument();
    expect(screen.getByTestId('instagram-icon')).toBeInTheDocument();
  });

  it('should have correct social media links', () => {
    render(<Footer />);
    
    const youtubeLink = screen.getByLabelText('YouTube');
    const facebookLink = screen.getByLabelText('Facebook');
    const instagramLink = screen.getByLabelText('Instagram');
    
    expect(youtubeLink).toHaveAttribute('href', 'https://youtube.com');
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com');
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com');
  });

  it('should open social media links in new tab', () => {
    render(<Footer />);
    
    const youtubeLink = screen.getByLabelText('YouTube');
    const facebookLink = screen.getByLabelText('Facebook');
    const instagramLink = screen.getByLabelText('Instagram');
    
    expect(youtubeLink).toHaveAttribute('target', '_blank');
    expect(facebookLink).toHaveAttribute('target', '_blank');
    expect(instagramLink).toHaveAttribute('target', '_blank');
    
    expect(youtubeLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render border line', () => {
    render(<Footer />);
    
    const borderDiv = document.querySelector('.border-t');
    expect(borderDiv).toBeInTheDocument();
  });

  it('should render copyright text', () => {
    render(<Footer />);
    
    expect(screen.getByText(/Ice Dreams @ 2026/)).toBeInTheDocument();
  });

  it('should render legal links', () => {
    render(<Footer />);
    
    const privacyLink = screen.getByText('Política de Privacidade');
    const termsLink = screen.getByText('Termos de Uso');
    
    expect(privacyLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
  });

  it('should have correct legal links href', () => {
    render(<Footer />);
    
    const privacyLink = screen.getByText('Política de Privacidade');
    const termsLink = screen.getByText('Termos de Uso');
    
    expect(privacyLink).toHaveAttribute('href', '/politica-privacidade');
    expect(termsLink).toHaveAttribute('href', '/termos-uso');
  });

  it('should render all social media links with aria labels', () => {
    render(<Footer />);
    
    expect(screen.getByLabelText('YouTube')).toBeInTheDocument();
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
  });
});
