import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check } from "lucide-react";
import { supportedLanguages } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLang = supportedLanguages.find(lang => lang.code === i18n.language) || supportedLanguages[0];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    document.documentElement.lang = langCode;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="gap-2"
          data-testid="button-language-switcher"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{currentLang.code.toUpperCase()}</span>
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {supportedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`gap-3 cursor-pointer ${i18n.language === lang.code ? 'bg-accent' : ''}`}
            data-testid={`lang-option-${lang.code}`}
          >
            <span className="font-medium text-xs w-6 text-muted-foreground">{lang.code.toUpperCase()}</span>
            <span className="flex-1">{lang.name}</span>
            {i18n.language === lang.code && <Check className="w-4 h-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
