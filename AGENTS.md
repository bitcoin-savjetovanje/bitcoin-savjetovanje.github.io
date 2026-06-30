# AGENTS.md

- Kada korisnik piše na hrvatskom, odgovaraj hrvatskim jezikom i latinicom. Nikada ne koristi ćirilicu.
- Kada korisnik kaže "pushaj live", deployaj direktno na Cloudflare Pages kroz postojeći Cloudflare workflow. Ne koristi GitHub kao deploy putanju i ne pretpostavljaj da treba `git push` osim ako korisnik to izričito zatraži.
- Git commit može biti koristan za čist deploy iz lokalnog commita, ali GitHub push nije preduvjet za live deploy.
