import { Palette, Type, Layout, Zap } from "lucide-react";
import { Badge } from "./ui/badge";

export function DesignSystemGuide() {
  return (
    <div className="min-h-screen w-full bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            ProspEra Design System
          </h1>
          <p className="text-muted-foreground">
            A comprehensive mobile UI/UX design system for gamified financial literacy
          </p>
        </div>

        {/* Color Palette */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-primary" />
            <h2 style={{ fontFamily: 'Poppins, sans-serif' }}>Color Palette</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="h-24 bg-[#00A86B] rounded-xl mb-2"></div>
              <p className="text-sm">Jade Green</p>
              <p className="text-xs text-muted-foreground">#00A86B</p>
              <Badge variant="outline" className="mt-1 text-xs">Primary</Badge>
            </div>
            <div>
              <div className="h-24 bg-[#006B5E] rounded-xl mb-2"></div>
              <p className="text-sm">Deep Teal</p>
              <p className="text-xs text-muted-foreground">#006B5E</p>
              <Badge variant="outline" className="mt-1 text-xs">Secondary</Badge>
            </div>
            <div>
              <div className="h-24 bg-[#F4B942] rounded-xl mb-2"></div>
              <p className="text-sm">Gold</p>
              <p className="text-xs text-muted-foreground">#F4B942</p>
              <Badge variant="outline" className="mt-1 text-xs">Accent</Badge>
            </div>
            <div>
              <div className="h-24 bg-[#0D47A1] rounded-xl mb-2"></div>
              <p className="text-sm">Trust Blue</p>
              <p className="text-xs text-muted-foreground">#0D47A1</p>
              <Badge variant="outline" className="mt-1 text-xs">Accent</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <div className="h-20 bg-[#4CAF50] rounded-xl mb-2"></div>
              <p className="text-sm">Success</p>
              <p className="text-xs text-muted-foreground">#4CAF50</p>
            </div>
            <div>
              <div className="h-20 bg-[#FF6F00] rounded-xl mb-2"></div>
              <p className="text-sm">Alert</p>
              <p className="text-xs text-muted-foreground">#FF6F00</p>
            </div>
            <div>
              <div className="h-20 bg-[#D32F2F] rounded-xl mb-2"></div>
              <p className="text-sm">Error</p>
              <p className="text-xs text-muted-foreground">#D32F2F</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Type className="w-6 h-6 text-primary" />
            <h2 style={{ fontFamily: 'Poppins, sans-serif' }}>Typography</h2>
          </div>
          
          <div className="space-y-4 bg-card p-6 rounded-2xl border border-border">
            <div>
              <h1 style={{ fontFamily: 'Poppins, sans-serif' }}>Heading 1 - Poppins Bold</h1>
              <p className="text-xs text-muted-foreground mt-1">Used for main page titles</p>
            </div>
            <div>
              <h2 style={{ fontFamily: 'Poppins, sans-serif' }}>Heading 2 - Poppins Bold</h2>
              <p className="text-xs text-muted-foreground mt-1">Used for section headers</p>
            </div>
            <div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif' }}>Heading 3 - Poppins Bold</h3>
              <p className="text-xs text-muted-foreground mt-1">Used for card titles</p>
            </div>
            <div>
              <p>Body Text - Inter Regular (16px minimum for accessibility)</p>
              <p className="text-xs text-muted-foreground mt-1">Used for all body content</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Small Text - Inter Regular 14px</p>
              <p className="text-xs text-muted-foreground mt-1">Used for captions and labels</p>
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Layout className="w-6 h-6 text-primary" />
            <h2 style={{ fontFamily: 'Poppins, sans-serif' }}>Key Components</h2>
          </div>
          
          <div className="grid gap-4">
            <div className="bg-card p-6 rounded-2xl border border-border">
              <h4 className="mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Game Cards</h4>
              <p className="text-sm text-muted-foreground mb-4">
                180x240px cards with gradient backgrounds, icons, progress indicators
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-4 flex items-end">
                  <div className="text-white">
                    <div className="text-3xl mb-2">🛒</div>
                    <p className="text-sm">Budget Bazaar</p>
                  </div>
                </div>
                <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl p-4 flex items-end">
                  <div className="text-white">
                    <div className="text-3xl mb-2">📈</div>
                    <p className="text-sm">Stock Market</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border">
              <h4 className="mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Bottom Navigation</h4>
              <p className="text-sm text-muted-foreground mb-4">
                5-tab navigation with icons and labels (Home, Games, Learn, Videos, Profile)
              </p>
              <div className="flex justify-around bg-background rounded-xl p-4">
                <div className="flex flex-col items-center text-primary">
                  <div className="w-6 h-6 mb-1 bg-primary rounded"></div>
                  <span className="text-xs">Home</span>
                </div>
                <div className="flex flex-col items-center text-muted-foreground">
                  <div className="w-6 h-6 mb-1 bg-muted rounded"></div>
                  <span className="text-xs">Games</span>
                </div>
                <div className="flex flex-col items-center text-muted-foreground">
                  <div className="w-6 h-6 mb-1 bg-muted rounded"></div>
                  <span className="text-xs">Learn</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Principles */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-primary" />
            <h2 style={{ fontFamily: 'Poppins, sans-serif' }}>Design Principles</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card p-6 rounded-2xl border border-border">
              <h4 className="mb-2">🎨 Modern Flat Design</h4>
              <p className="text-sm text-muted-foreground">
                Clean, professional appearance with subtle gradients and shadows
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border">
              <h4 className="mb-2">🇮🇳 Indian Cultural Elements</h4>
              <p className="text-sm text-muted-foreground">
                Rupee symbols, local scenarios, regional language support
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border">
              <h4 className="mb-2">♿ Accessibility First</h4>
              <p className="text-sm text-muted-foreground">
                16px minimum font, high contrast, screen reader friendly
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border">
              <h4 className="mb-2">📱 Mobile-First</h4>
              <p className="text-sm text-muted-foreground">
                Optimized for 375px width, responsive up to tablets
              </p>
            </div>
          </div>
        </section>

        {/* Grid System */}
        <section className="bg-card p-6 rounded-2xl border border-border">
          <h3 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Grid System</h3>
          <div className="space-y-3 text-sm">
            <p><strong>Base Unit:</strong> 8px grid system</p>
            <p><strong>Spacing:</strong> 4px, 8px, 12px, 16px, 24px, 32px, 48px</p>
            <p><strong>Border Radius:</strong> 8px (small), 12px (medium), 16px (large), 24px (cards)</p>
            <p><strong>Max Width:</strong> 440px (mobile container)</p>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>ProspEra - Empowering India's Financial Future</p>
          <p className="mt-2">Design System v1.0.0</p>
        </div>
      </div>
    </div>
  );
}
