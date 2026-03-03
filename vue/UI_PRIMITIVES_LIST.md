# UI PRIMITIVES LIST

Every file under `react/src/components/ui/`. Target location in Vue: `vue/src/components/ui/`.

Required for initial page rendering (Welcome / Landing2 / Register / Auth / Dashboard): marked with [INITIAL].

| # | React file | Required for initial (Welcome/Landing2/Register/Auth/Dashboard) | Vue target |
|---|------------|----------------------------------------------------------------|------------|
| 1 | accordion.tsx | | vue/src/components/ui/Accordion.vue |
| 2 | alert-dialog.tsx | | vue/src/components/ui/AlertDialog.vue |
| 3 | alert.tsx | | vue/src/components/ui/Alert.vue |
| 4 | aspect-ratio.tsx | | vue/src/components/ui/AspectRatio.vue |
| 5 | avatar.tsx | Dashboard (indirect), Treatments, PatientPortal | vue/src/components/ui/Avatar.vue |
| 6 | badge.tsx | | vue/src/components/ui/Badge.vue |
| 7 | breadcrumb.tsx | | vue/src/components/ui/Breadcrumb.vue |
| 8 | button.tsx | [INITIAL] Welcome, Register, Auth, Dashboard, Plan, Checkout, AssessmentComplete | vue/src/components/ui/Button.vue |
| 9 | calendar.tsx | ManageSubscription | vue/src/components/ui/Calendar.vue |
| 10 | card.tsx | | vue/src/components/ui/Card.vue |
| 11 | carousel.tsx | | vue/src/components/ui/Carousel.vue |
| 12 | chart.tsx | | vue/src/components/ui/Chart.vue |
| 13 | checkbox.tsx | [INITIAL] Register, Auth, Plan, Checkout, ManageSubscription | vue/src/components/ui/Checkbox.vue |
| 14 | collapsible.tsx | Profile | vue/src/components/ui/Collapsible.vue |
| 15 | command.tsx | | vue/src/components/ui/Command.vue |
| 16 | context-menu.tsx | | vue/src/components/ui/ContextMenu.vue |
| 17 | dialog.tsx | [INITIAL] Auth, Treatments, Profile, ManageSubscription | vue/src/components/ui/Dialog.vue |
| 18 | drawer.tsx | | vue/src/components/ui/Drawer.vue |
| 19 | dropdown-menu.tsx | [INITIAL] Dashboard | vue/src/components/ui/DropdownMenu.vue |
| 20 | form.tsx | | vue/src/components/ui/Form.vue |
| 21 | hover-card.tsx | | vue/src/components/ui/HoverCard.vue |
| 22 | input-otp.tsx | | vue/src/components/ui/InputOtp.vue |
| 23 | input.tsx | [INITIAL] Register, Auth, Payment, Profile, ManageSubscription, Lifestyle, Checkout | vue/src/components/ui/Input.vue |
| 24 | label.tsx | [INITIAL] Register, Auth | vue/src/components/ui/Label.vue |
| 25 | menubar.tsx | | vue/src/components/ui/Menubar.vue |
| 26 | navigation-menu.tsx | | vue/src/components/ui/NavigationMenu.vue |
| 27 | pagination.tsx | | vue/src/components/ui/Pagination.vue |
| 28 | popover.tsx | | vue/src/components/ui/Popover.vue |
| 29 | progress.tsx | | vue/src/components/ui/Progress.vue |
| 30 | radio-group.tsx | | vue/src/components/ui/RadioGroup.vue |
| 31 | resizable.tsx | | vue/src/components/ui/Resizable.vue |
| 32 | scroll-area.tsx | | vue/src/components/ui/ScrollArea.vue |
| 33 | select.tsx | [INITIAL] Auth | vue/src/components/ui/Select.vue |
| 34 | separator.tsx | | vue/src/components/ui/Separator.vue |
| 35 | sheet.tsx | CartDrawer uses Sheet; global layout | vue/src/components/ui/Sheet.vue |
| 36 | sidebar.tsx | | vue/src/components/ui/Sidebar.vue |
| 37 | skeleton.tsx | | vue/src/components/ui/Skeleton.vue |
| 38 | slider.tsx | | vue/src/components/ui/Slider.vue |
| 39 | sonner.tsx | App-level Toaster | vue/src/components/ui/Sonner.vue |
| 40 | switch.tsx | | vue/src/components/ui/Switch.vue |
| 41 | table.tsx | | vue/src/components/ui/Table.vue |
| 42 | tabs.tsx | PatientPortal | vue/src/components/ui/Tabs.vue |
| 43 | textarea.tsx | | vue/src/components/ui/Textarea.vue |
| 44 | toaster.tsx | App-level | vue/src/components/ui/Toaster.vue |
| 45 | toast.tsx | App-level | vue/src/components/ui/Toast.vue |
| 46 | toggle-group.tsx | | vue/src/components/ui/ToggleGroup.vue |
| 47 | toggle.tsx | | vue/src/components/ui/Toggle.vue |
| 48 | tooltip.tsx | App-level TooltipProvider | vue/src/components/ui/Tooltip.vue |
| 49 | use-toast.ts | (hook, not component) | vue/src/composables/useToast.ts |

**Total UI primitives: 49**

**Required for initial (Welcome, Landing2, Register, Auth, Dashboard):** Button, Input, Label, Checkbox, Dialog, Select, DropdownMenu, Sheet (for cart). Optional app-level: Toaster, Sonner, Tooltip.
