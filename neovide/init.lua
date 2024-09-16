-- Checking whether neovide is available
if !vim.g.neovide then
    vim.print('Neovide not available. Exiting...')
    return
else
    vim.print('Using version: ' .. vim.g.neovide_version)
end

-- Font Settings
vim.o.guifont = 'JetBrainsMono Nerd Font:h11'

-- Vim Settings
vim.g.neovide_cursor_vfx_mode = 'railgun'
