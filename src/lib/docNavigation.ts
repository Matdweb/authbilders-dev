
import { generalCategories, technologySections } from './docLinks';

// Create a flat array of all documentation links in sidebar order
export const getDocumentationOrder = () => {
  const allLinks: Array<{ title: string; href: string }> = [];
  
  // Add general categories first
  generalCategories.forEach(category => {
    category.links.forEach(link => {
      allLinks.push(link);
    });
  });
  
  // Add technology sections (only enabled ones)
  technologySections.forEach(tech => {
    if (!tech.disabled) {
      tech.categories.forEach(category => {
        category.links.forEach(link => {
          if (!link.disabled) {
            allLinks.push(link);
          }
        });
      });
    }
  });
  
  return allLinks;
};

export const getNavigationInfo = (currentPath: string) => {
  const allLinks = getDocumentationOrder();
  const currentIndex = allLinks.findIndex(link => link.href === currentPath);
  
  const prevLink = currentIndex > 0 ? allLinks[currentIndex - 1] : null;
  const nextLink = currentIndex < allLinks.length - 1 ? allLinks[currentIndex + 1] : null;
  
  return {
    prevLink,
    nextLink,
    isFirst: currentIndex === 0,
    isLast: currentIndex === allLinks.length - 1
  };
};
